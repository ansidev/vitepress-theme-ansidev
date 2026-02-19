---
type: project
title: jsonfmt
repositoryUrl: https://github.com/ansidev/jsonfmt
license: MIT
licenseUrl: https://github.com/ansidev/jsonfmt/blob/main/LICENSE
techs:
  - Go
  - Urfave CLI
  - GitHub Actions
developmentStatus: active
date: 2022-08-04T04:25:00+07:00
author: ansidev
gravatar: a2ac3c4477e717c7fa15041d907e71fd
twitter: "@ansidev"
---

JSON Formatter CLI

<!-- more -->

## Story

Recently, I've deployed some projects using KrakenD as an API Gateway.

The problem is the output JSON config is not formatted, that's hard to debug the configuration in the future.

As a developer, I want the configuration will be formatted or minified (production environment), so our team can debug if there is any problem.

I searched on the internet but there is no command line Go CLI application that I can use in our GitHub workflows. So I decided to built it.

## Technologies

`jsonfmt` is built with:

- [Go](https://go.dev).
- [urfave/cli v2](https://github.com/urfave/cli).

`jsonfmt` is built on top of [ansidev/json-pretty](https://github.com/ansidev/json-pretty) which is forked from [tidwall/pretty](https://github.com/tidwall/pretty) by [
Josh Baker](https://github.com/tidwall).

## Releases

https://github.com/ansidev/jsonfmt/releases

## Usage

https://github.com/ansidev/jsonfmt/blob/main/README.md
