/**
 * seed.js — Run once to populate MongoDB with initial days & sample submissions
 * Usage: node seed.js
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import { Day } from './models/Day.js';

const seedData = [
  {
    dayNumber: 1, title: 'Day 1',
    question: "Write a Java program to demonstrate the concept of classes and objects. Create a 'Student' class with attributes: name, roll number, and marks. Instantiate at least 3 objects and display their details.",
    submissions: [
      { studentName: 'Aditya Sharma', language: 'java', code: `public class Student {\n    String name;\n    int rollNo;\n    double marks;\n\n    Student(String name, int rollNo, double marks) {\n        this.name = name;\n        this.rollNo = rollNo;\n        this.marks = marks;\n    }\n\n    void display() {\n        System.out.println("Name: " + name + " | Roll: " + rollNo + " | Marks: " + marks);\n    }\n\n    public static void main(String[] args) {\n        Student s1 = new Student("Aditya", 101, 88.5);\n        Student s2 = new Student("Priya", 102, 92.0);\n        Student s3 = new Student("Rohan", 103, 76.5);\n        s1.display(); s2.display(); s3.display();\n    }\n}` },
      { studentName: 'Priya Nair', language: 'cpp', code: `#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Student {\npublic:\n    string name; int rollNo; float marks;\n    Student(string n, int r, float m) : name(n), rollNo(r), marks(m) {}\n    void display() { cout << "Name: " << name << " | Roll: " << rollNo << " | Marks: " << marks << endl; }\n};\n\nint main() {\n    Student s1("Priya",101,91.5); s1.display();\n    return 0;\n}` },
    ],
  },
  {
    dayNumber: 2, title: 'Day 2',
    question: "Implement encapsulation in Java. Create a 'BankAccount' class with private fields. Provide getters/setters and deposit()/withdraw() with validation.",
    submissions: [
      { studentName: 'Rohan Mehta', language: 'java', code: `public class BankAccount {\n    private String accountNumber;\n    private double balance;\n\n    public BankAccount(String accNo, double initial) { this.accountNumber = accNo; this.balance = initial; }\n    public double getBalance() { return balance; }\n\n    public void deposit(double amount) {\n        if (amount > 0) { balance += amount; System.out.println("Deposited: " + amount); }\n    }\n    public void withdraw(double amount) {\n        if (amount > 0 && amount <= balance) { balance -= amount; System.out.println("Withdrawn: " + amount); }\n        else System.out.println("Insufficient funds.");\n    }\n\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount("ACC-001", 5000);\n        acc.deposit(1500); acc.withdraw(2000);\n    }\n}` },
    ],
  },
  {
    dayNumber: 3, title: 'Day 3',
    question: "Demonstrate inheritance in Java. Create a base class 'Shape' with area(). Derive 'Circle', 'Rectangle', 'Triangle' and override area().",
    submissions: [
      { studentName: 'Sneha Patil', language: 'java', code: `abstract class Shape { abstract double area(); void display() { System.out.println("Area: " + area()); } }\nclass Circle extends Shape { double r; Circle(double r){this.r=r;} double area(){return Math.PI*r*r;} }\nclass Rectangle extends Shape { double l,w; Rectangle(double l,double w){this.l=l;this.w=w;} double area(){return l*w;} }\n\npublic class InheritanceDemo {\n    public static void main(String[] args) {\n        new Circle(5).display(); new Rectangle(4,6).display();\n    }\n}` },
    ],
  },
  { dayNumber: 4,  title: 'Day 4',  question: "Write a program to demonstrate polymorphism (method overloading and method overriding) in Java. Create a class 'Calculator' with overloaded add() methods.", submissions: [] },
  { dayNumber: 5,  title: 'Day 5',  question: "Implement an interface 'Playable' with methods play() and stop(). Create 'MusicPlayer' and 'VideoPlayer' implementing it.", submissions: [] },
  { dayNumber: 6,  title: 'Day 6',  question: "Demonstrate exception handling. Create a custom exception 'InsufficientAgeException'. Throw it when age < 18.", submissions: [] },
  { dayNumber: 7,  title: 'Day 7',  question: "Implement a generic stack (Stack<T>) with push(), pop(), peek(), and isEmpty().", submissions: [] },
  { dayNumber: 8,  title: 'Day 8',  question: "Demonstrate ArrayList, LinkedList, HashMap, HashSet. Perform CRUD on each.", submissions: [] },
  { dayNumber: 9,  title: 'Day 9',  question: "Multi-threaded counter: show the race condition, then fix with synchronized.", submissions: [] },
  { dayNumber: 10, title: 'Day 10', question: "File I/O: write student records to a file and read them back with proper exception handling.", submissions: [] },
  { dayNumber: 11, title: 'Day 11', question: "Lambda & Stream API: filter employees with salary > 50000, sort by name, print.", submissions: [] },
  { dayNumber: 12, title: 'Day 12', question: "Implement thread-safe Singleton using double-checked locking.", submissions: [] },
  { dayNumber: 13, title: 'Day 13', question: "Observer pattern: 'StockMarket' subject + 'Investor' observers notified on price change.", submissions: [] },
  { dayNumber: 14, title: 'Day 14', question: "Serialization: serialize a 'Person' object to a file and deserialize it back.", submissions: [] },
  { dayNumber: 15, title: 'Day 15', question: "Final Lab: Mini Library Management System using all OOP concepts learned.", submissions: [] },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Day.deleteMany({});
    console.log('🗑️  Cleared existing days');

    const result = await Day.insertMany(seedData);
    console.log(`🌱 Seeded ${result.length} days successfully!`);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

seed();
