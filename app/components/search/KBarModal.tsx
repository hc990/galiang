// noinspection TypeScriptMissingConfigOption

import {
    KBarPortal,
    KBarSearch,
    KBarAnimator,
    KBarPositioner,
    KBarResults,
    useMatches,
    Action,
    useRegisterActions,
  } from 'kbar'
  
  export const KBarModal = ({ actions, isLoading }: { actions: Action[]; isLoading: boolean }) => {
    useRegisterActions(actions, [actions])
  
    return (
      <KBarPortal>
        <KBarPositioner className="bg-gray-300/50 p-4 backdrop-blur backdrop-filter dark:bg-black/50">
          <KBarAnimator className="w-full max-w-xl">
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center space-x-4 p-4">
                <span className="block w-5">
                 
                </span>
                <KBarSearch className="h-8 w-full bg-transparent text-gray-600 placeholder-gray-400 focus:outline-none dark:text-gray-200 dark:placeholder-gray-500" />
                <kbd className="inline-block whitespace-nowrap rounded border px-1.5 align-middle font-medium leading-4 tracking-wide text-xs text-gray-400 border-gray-400">
                  ESC
                </kbd>
              </div>
              {!isLoading && <RenderResults />}
              {isLoading && (
                <div className="block border-t border-gray-100 px-4 py-8 text-center text-gray-400 dark:border-gray-800 dark:text-gray-600">
                  Loading...
                </div>
              )}
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
    )
  }
  
  const RenderResults = () => {
    const { results } = useMatches()
  
    if (results.length) {
      return (
        <KBarResults
          items={results}
          onRender={({ item, active }) => (
            <div>
              {typeof item === 'string' ? (
                <div className="pt-3">
                  <div className="block border-t border-gray-100 px-4 pb-2 pt-6 text-xs font-semibold uppercase text-primary-600 dark:border-gray-800">
                    {item}
                  </div>
                </div>
              ) : (
                <div
                  className={`flex cursor-pointer justify-between px-4 py-2 ${
                    active
                      ? 'bg-primary-600 text-gray-100'
                      : 'text-gray-700 dark:text-gray-100 bg-transparent'
                  }`}
                >
                  <div className={'flex space-x-2'}>
                    {item.icon && <div className={"self-center"}>{item.icon}</div> }
                    <div className="block">
                      {item.subtitle && (
                        <div className={`${active ? 'text-gray-200' : 'text-gray-400'} text-xs`}>
                          {item.subtitle}
                        </div>
                      )}
                      <div>{item.name}</div>
                    </div>
                  </div>
                  {item.shortcut?.length ? (
                    <div aria-hidden className="flex flex-row items-center justify-center gap-x-2">
                      {item.shortcut.map((sc) => (
                        <kbd
                          key={sc}
                          className={`font-medium h-7 w-6 flex items-center	justify-center text-xs rounded border ${
                            active ? 'text-gray-200 border-gray-200' : 'text-gray-400 border-gray-400'
                          }`}
                        >
                          {sc}
                        </kbd>
                      ))}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          )}
        />
      )
    } else {
      return (
        <div className="block border-t border-gray-100 px-4 py-8 text-center text-gray-400 dark:border-gray-800 dark:text-gray-600">
          No results for your search...
        </div>
      )
    }
  }