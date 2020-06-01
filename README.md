# frontend-project-lvl2 <br>
![Node CI](https://github.com/Alexey-Pavlov/frontend-project-lvl2/workflows/Node%20CI/badge.svg)
<a href="https://codeclimate.com/github/Alexey-Pavlov/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/dd44ee34b395a9e908a1/maintainability" /></a>
<a href="https://codeclimate.com/github/Alexey-Pavlov/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/dd44ee34b395a9e908a1/test_coverage" /></a>

This is educational project from Hexlet, profession Frontend-Javascript. [Read more about Hexlet (in Russian)](https://ru.hexlet.io/pages/about?utm_source=github&utm_medium=link&utm_campaign=nodejs-package).<br>
The second project is a logical continuation of the first. It captures most of the syntax of js and uses a more sophisticated architecture.<br>
As part of this project, a utility was implemented to look for differences in configuration files.<br>
Utility features:
* Support for different formats
* Report generation as plain text, pretty and json

## Setup

```sh
$ make install
```

## Comparison of flat files (JSON)
<a href="https://asciinema.org/a/zHIAOTDK7HPiw1hCxrbktCrb2" target="_blank"><img src="https://asciinema.org/a/zHIAOTDK7HPiw1hCxrbktCrb2.svg" /></a>

## Comparison of flat files (yaml)
<a href="https://asciinema.org/a/V8leTDIJ28IzosbEwpC71mAPy" target="_blank"><img src="https://asciinema.org/a/V8leTDIJ28IzosbEwpC71mAPy.svg" /></a>

## Comparison of flat files (ini)
<a href="https://asciinema.org/a/YCzM4n1gNCKxdKIWp889ZWwTd" target="_blank"><img src="https://asciinema.org/a/YCzM4n1gNCKxdKIWp889ZWwTd.svg" /></a>

## Three types of output formats

```
gendiff --format tree filename1 filename2
```

### Tree format of output

[![asciicast](https://asciinema.org/a/dxMta3cdJZFxJ7Dmeve6wU5xb.svg)](https://asciinema.org/a/dxMta3cdJZFxJ7Dmeve6wU5xb)
```
gendiff --format plain filename1 filename2
```

### Plain format of output

[![asciicast](https://asciinema.org/a/tmPElivYPTjBNtOeBkA3SpfRU.svg)](https://asciinema.org/a/tmPElivYPTjBNtOeBkA3SpfRU)

### JSON format of ouput
```
gendiff --format json filename1 filename2
```

[![asciicast](https://asciinema.org/a/wRbtAPA73JdjETQs5eJEBmky1.svg)](https://asciinema.org/a/wRbtAPA73JdjETQs5eJEBmky1)
