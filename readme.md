A simple code exploration, inspired by (and stollen from) Björn Staal. [More info here](https://www.linkedin.com/feed/update/urn:li:activity:7133171531567816705/).

![Screen Recording 2023-11-23 at 11 12 57](https://github.com/Momciloo/fun-with-sockets/assets/15079459/90b4fea3-fd53-4127-bbb9-96e76944e9f4)


How to run this experiment locally:

1. `npm i`
2. Then, open one more terminal.
3. In the first terminal:
`node server/server.js`
4. In the second terminal:
`cd client && http-server`
5. Open `localhost:8080?b=1` in one tab, and
6. Open `localhost:8080?b=2` in another tab


## Future ideas
1. I plan to add a flag to run this in localStorage mode only
2. I plan to add an option for an infinity number of windows and remove the need for the query in the URL
