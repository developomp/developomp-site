# <a href="https://developomp.com" target="_blank">developomp-site</a>

Tools used:

|                                    Name | Use                                     |
| --------------------------------------: | :-------------------------------------- |
|                 [Hexo](https://hexo.io) | generating static files                 |
| [Firebase](https://firebase.google.com) | hosting site (Future: hosting database) |
|            [Github](https://github.com) | storing source & automatic deployment   |
|           [AWS](https://aws.amazon.com) | Domain name purchase & management       |

# Setup

Requires: [git](https://git-scm.com), [node](https://nodejs.org), [hexo](https://github.com/hexojs/hexo), [firebase](https://firebase.google.com)

- Clone the repo with git modules
  - `git clone --recurse-submodules https://github.com/developomp/developomp-site.git`
  - to update: `git submodule foreach git pull origin master`
- Install dependencies
  - `cd developomp-site/hexo`
  - `yarn` or `npm i`
- Generate files
  - `hexo generate`
- (optional, requires firebase setup) deploy it to firebase
  - `firebase deploy`

# License

This project is licensed under the MIT License.\
Check the [LICENSE file](./LICENSE) for more information.
