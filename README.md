![tailwind-nextjs-banner](/public/static/images/twitter-card.png)

# Based on Tailwind Nextjs Prisma Axios blog demo code


## Installation

```bash
yarn
```

Please note, that if you are using Windows, you may need to run:

```bash
set PWD="$(pwd)"
```

## Development

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Edit the layout in `app` or content in `data`. With live reloading, the pages auto-updates as you edit them.


`tailwind.config.js` and `css/tailwind.css` - tailwind configuration and stylesheet which can be modified to change the overall look and feel of the site.



`next.config.js` - configuration related to Next.js. You need to adapt the Content Security Policy if you want to load scripts, images etc. from other domains.

# Database : MongoDB


sudo docker run -d -p 192.168.2.214:3000:3000  --mount type=bind,source=/volume2/library/books,target=/Users/huangchong/SynologyDrive/books/ --mount type=bind,source=/volume2/library/thumbnail,target=/usr/src/app/public/thumbnail -it huangchong/galiang

sudo docker run -d  --mount type=bind,source=/volume2/library/books,target=/app/data     -it deploygl


db.books.createIndexes([{'createAt':1,'name':1,'extend':1}],{ unique: true })