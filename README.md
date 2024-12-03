# SoftUni-Angular-Project

### How to install the dependencies and start the project:

```
cd Angular-project
npm install
ng serve
```

### Start the server by open a new terminal and do this:

```
cd server
node server.js
```

# How it works

**Welcome page**

Every ``guest`` can see a Welcome page with the latest books.

**Catalog page**

Whether you are logged in or not you can see all books with details for every book, but if you not logged in, You do not have permission for functionality.

**Details page**

If you are logged in, you have permission to ``buy book`` if you are not the author of book, and to ``edit/delete`` if you are the author of book.

**Create page**

If you are logged in, you can ``create`` your own book with ``title``, ``genre``, ``price``, ``desc``, and ``image``.

**Profile page**

If you are logged in, in profile page you can see all your created book, which can be deleted directly or go to details page.
