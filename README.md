# Mirum Base - 2017

A starting point for Mirum projects. It includes a node server for local development along with browsersync and hot module replacement.

## Requirements

In order to run you will need [Node 8.7+](https://nodejs.org/en/download/).

## Usage

Copy the files from the repo into your project. Use `npm install` to bring down the dependencies. When doing local 
development you can use `npm run serve` to start a local server. Any change you make to a file will cause the browser 
to update automatically.

If you simply want to build the site use `npm run build`.

There is some configuration you can do to customize the project. Inside `package.json` there is a key named `config`. 
There you can change the directories where files live and their destinations. `copyDirs` is an array of directories that 
just need to be copied when the site is built such as fonts.

## License

MIT License

Copyright (c) 2017 Mirum Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.





