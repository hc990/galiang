

import Button from "@/app/components/common/Button"
import { HiPlus } from "react-icons/hi"
import { LuPanelLeft } from "react-icons/lu"

export default function Menubar() {
    return (
        <div className='flex space-x-3'>
            <Button
                icon={HiPlus}
                variant='outline'
                className='flex-1'  
            >
                新建对话
            </Button>
            <Button
                icon={LuPanelLeft}
                variant='outline'
                // onClick={() => {
                //     dispatch({
                //         type: ActionType.UPDATE,
                //         field: "displayNavigation",
                //         value: false
                //     })
                // }}
            />
        </div>
    )
}