# Smart Mess Management System

A QR-based digital mess management platform that enables students to **pay only for the meals they consume** instead of paying fixed mess fees. The system uses a **wallet-based payment model and QR scanning** to record meal consumption and automatically deduct meal costs.

This project aims to **reduce food wastage, improve transparency in mess billing, and provide useful analytics to mess administrators.**

---

## Problem Statement

In many hostel mess systems, students pay a **fixed yearly mess fee**, even if they skip meals. This leads to:

* Wasted money for students
* Food wastage due to inaccurate demand estimation
* Lack of transparency in mess consumption

The Smart Mess Management System introduces a **pay-per-meal model** where students scan a QR code at the mess entrance, confirm their meal, and the system deducts the meal cost from their wallet balance.

---

## Features

### Student Features

* Secure user registration and login
* Digital wallet to manage mess balance
* QR code scanning for meal entry
* Automatic meal cost deduction
* Meal history tracking
* Wallet recharge system

### Admin Features

* View daily meal consumption statistics
* Update meal prices
* Monitor total revenue
* Track meal demand patterns

### System Features

* QR-based mess entry system
* Duplicate meal scan prevention
* Real-time wallet balance updates
* Transaction history for transparency

---

## System Architecture

The system follows a **three-tier architecture**:

Frontend (React)
↓
Backend API (Node.js + Express)
↓
Database (MongoDB)

### Meal Scan Flow

Student arrives at mess
↓
Student scans QR code
↓
System detects meal time
↓
Student confirms meal
↓
Backend verifies wallet balance
↓
Meal cost deducted from wallet
↓
Meal record stored in database
↓
Success screen shown to mess worker

---

## Tech Stack

### Frontend

* React
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* MongoDB
* Mongoose

---

## Database Collections

The system uses the following collections:

**Users**

Stores student and admin account information.

Fields:

* name
* email
* password
* wallet_balance
* role

**Transactions**

Stores wallet transactions.

Fields:

* user_id
* amount
* type (recharge / meal)
* meal
* timestamp

**MealScans**

Stores records of consumed meals.

Fields:

* user_id
* meal
* date
* timestamp

**MealPrices**

Stores the cost of each meal.

Fields:

* breakfast
* lunch
* snacks
* dinner

---

## Project Structure

smart-mess-management-system
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   └── server.js
│
├── frontend
│   ├── src
│   ├── components
│   └── pages
│
└── README.md

---

## Future Improvements

* Meal pre-booking system
* Food demand prediction using historical data
* Real-time mess analytics dashboard
* Mobile app version
* Online payment integration

---

## Author

Prerna Chaurasiya
