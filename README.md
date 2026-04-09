# ReviewEverything - a PRO450 course assignment.

## How To Commit:
Developers of this project must follow our github structure, that is defined below:
### 1. Create a local branch off of the existing prod branch to kick off development.
This means just having the repo cloned to your machine. Clone it with the following command inside of your current chosen directory:

```git clone https://github.com/MrpZellen/ReviewEverything```

### 2. Setup your local development environment.
I will list our specifications here after our in class discussion on Thursday.
### 3. Determine the ticket you will be working on, what item it is (Hotfix, Bugfix, Feature).
[Check Features here](https://trello.com/b/ETpF5e4f/dev-team)

<img width="1591" height="723" alt="image" src="https://github.com/user-attachments/assets/ea7c8d4e-3e6b-42e0-9d35-f70e7b2d4882" />
using this information, define a **branch name** following these rules:

 - Prefix with 'feature-', 'bugfix-', or 'hotfix-'.

 - follow it with feature name/bug ticket #. if it's a bug, ensure you use the number tied to it inside of our Trello.

Examples include:

```
feature-usermodel
feature-registration
bugfix-000
bugfix-013
```
### 4. Once finished with your work, do not PUSH directly to PROD or STAGING.
We will be following a **rebase practice first.** So to properly rebase the branch once you are done, use this command, then just save without edits to the pick order.

```git rebase --i staging```

However, if you have multiple personal commits for one feature, (i.e. registration backend, registration frontend) **please squash**. Using the same command above, you want to then change the listed items from all 'pick' to just the first one being prefixed with 'pick' and the rest being prefixed 's'. This will squash all older commits except the latest commit **into the latest commit, then rebase the branch**. Make sure you keep the first in the list as 'pick' as to not lose progress.
### For example:
Assuming below you have the following list on git rebase -i:

```
pick commit_id New Thing
pick commit_id New Thing 2
pick commit_id New Thing 3
pick commit_id New Thing 4
```

You can squash them all by editing the file to instead be formatted the following:

```
pick commit_id New Thing
s commit_id New Thing 2
s commit_id New Thing 3
s commit_id New Thing 4
```

This will squash all the older commits into the top commit, and keep the name of that commit (being New Thing).
Then, the rebase will proceed. You will have another popup to optionally change your commit message, which is recommended but not required.

In Staging, we will define reviews or tests needed to push to PROD. This will be fast at first, but will take more work as the project develops. This will guarantee a secure Prod, though.
