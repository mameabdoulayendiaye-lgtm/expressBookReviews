const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// ---------- TÂCHE 1 : Liste de tous les livres ----------
public_users.get('/', function (req, res) {
    res.send(JSON.stringify(books, null, 4));
});

// ---------- TÂCHE 2 : Détails par ISBN ----------
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        res.send(JSON.stringify(books[isbn], null, 4));
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// ---------- TÂCHE 3 : Détails par auteur ----------
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const keys = Object.keys(books);
    const result = {};
    keys.forEach(k => {
        if (books[k].author === author) {
            result[k] = books[k];
        }
    });
    if (Object.keys(result).length > 0) {
        res.send(JSON.stringify(result, null, 4));
    } else {
        res.status(404).json({ message: "No books found for this author" });
    }
});

// ---------- TÂCHE 4 : Détails par titre ----------
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const keys = Object.keys(books);
    const result = {};
    keys.forEach(k => {
        if (books[k].title === title) {
            result[k] = books[k];
        }
    });
    if (Object.keys(result).length > 0) {
        res.send(JSON.stringify(result, null, 4));
    } else {
        res.status(404).json({ message: "No books found with this title" });
    }
});

// ---------- TÂCHE 5 : Avis par ISBN ----------
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        res.send(JSON.stringify(books[isbn].reviews, null, 4));
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// ======================================================
// TÂCHES 10-13 : Version ASYNC/AWAIT avec AXIOS
// ======================================================

// Tâche 10 : tous les livres via Axios
public_users.get('/async/books', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:5000/');
        res.send(JSON.stringify(response.data, null, 4));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Tâche 11 : par ISBN via Axios
public_users.get('/async/isbn/:isbn', async function (req, res) {
    try {
        const response = await axios.get(`http://localhost:5000/isbn/${req.params.isbn}`);
        res.send(JSON.stringify(response.data, null, 4));
    } catch (err) {
        res.status(404).json({ message: "Book not found" });
    }
});

// Tâche 12 : par auteur via Axios
public_users.get('/async/author/:author', async function (req, res) {
    try {
        const response = await axios.get(`http://localhost:5000/author/${req.params.author}`);
        res.send(JSON.stringify(response.data, null, 4));
    } catch (err) {
        res.status(404).json({ message: "No books found for this author" });
    }
});

// Tâche 13 : par titre via Axios
public_users.get('/async/title/:title', async function (req, res) {
    try {
        const response = await axios.get(`http://localhost:5000/title/${req.params.title}`);
        res.send(JSON.stringify(response.data, null, 4));
    } catch (err) {
        res.status(404).json({ message: "No books found with this title" });
    }
});

module.exports.general = public_users;