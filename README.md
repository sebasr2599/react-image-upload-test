# BHCG Coding Exam

## Description

This is a Coding exam where the goal is to implement a simple image upload CRUD using a React front-end and a PHP or Node back-end.
For this specific project the use of React with the Node.js framework Nest.js was selected by the developer. This project is also build using a Monorepo with [nx.dev](https://nx.dev) software development strategy.

## Setup

### SQL

Be sure to have mysql installed

### Enviroment files

Add a .env file to the ./back-end directory in there write your mysql configutation for Prisma using the following configuration:

```
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
```

More information [here](https://www.prisma.io/docs/concepts/components/prisma-migrate/migrate-development-production)

### Migration

cd into the back-end directory and then run the migrations using

```bash
npx prisma migrate dev
```

## Start the app

To start the development front-end server run `nx serve bhcg-exam`. Open your browser and navigate to http://localhost:4200/. Happy coding!
To start the development back-end-end server run `nx serve back-end`.

<!-- ## Running tasks

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks). -->

## Author

Sebastian Resendiz
