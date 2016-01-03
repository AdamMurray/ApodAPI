
# Astro Pics Nasa Deployment Guide

Currently, we have two environments for deploying the application to.

One is for testing purposes and the other is for live deployment.

The testing environment is run on a **free** Heroku dyno, and so is only available for
18 hours per day, and will sleep after 30 minutes of inactivity.

The live environment is run on a **paid** Heroku dyno, and so is always up and running
and available to the public.

## Setting up the remote repos

In order to deploy to each of the environments, we must first add the two remote
branches to our project, which can be done as follows:

```
# Test branch
> git remote add heroku-test git@heroku.com:test-astropicsnasa.git
```

```
# Live branch
> git remote add heroku git@heroku.com:astropicsnasa.git
```

## Pushing to the remote repos

We can then push to each of the branches with the following commands:

```
# Test branch
> git push heroku-test master
```

```
# Live branch
> git push heroku master
```
