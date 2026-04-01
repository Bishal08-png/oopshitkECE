// Mock data representing MongoDB documents.
// Replace api calls like: fetch('/api/days') when backend is ready.

export const mockDays = [
  {
    _id: "day1",
    dayNumber: 1,
    title: "Day 1",
    question: "Write a Java program to demonstrate the concept of classes and objects. Create a 'Student' class with attributes: name, roll number, and marks. Instantiate at least 3 objects and display their details.",
    submissions: [
      {
        _id: "sub1a",
        studentName: "Aditya Sharma",
        language: "java",
        code: `public class Student {
    String name;
    int rollNo;
    double marks;

    Student(String name, int rollNo, double marks) {
        this.name = name;
        this.rollNo = rollNo;
        this.marks = marks;
    }

    void display() {
        System.out.println("Name: " + name + " | Roll: " + rollNo + " | Marks: " + marks);
    }

    public static void main(String[] args) {
        Student s1 = new Student("Aditya", 101, 88.5);
        Student s2 = new Student("Priya", 102, 92.0);
        Student s3 = new Student("Rohan", 103, 76.5);
        s1.display();
        s2.display();
        s3.display();
    }
}`,
        submittedAt: "2025-01-10T09:15:00Z",
      },
      {
        _id: "sub1b",
        studentName: "Priya Nair",
        language: "cpp",
        code: `#include <iostream>
#include <string>
using namespace std;

class Student {
public:
    string name;
    int rollNo;
    float marks;

    Student(string n, int r, float m) : name(n), rollNo(r), marks(m) {}

    void display() {
        cout << "Name: " << name
             << " | Roll: " << rollNo
             << " | Marks: " << marks << endl;
    }
};

int main() {
    Student s1("Priya", 101, 91.5);
    Student s2("Kiran", 102, 84.0);
    Student s3("Mehul", 103, 78.5);
    s1.display();
    s2.display();
    s3.display();
    return 0;
}`,
        submittedAt: "2025-01-10T09:45:00Z",
      },
    ],
  },
  {
    _id: "day2",
    dayNumber: 2,
    title: "Day 2",
    question: "Implement encapsulation in Java. Create a 'BankAccount' class with private fields (accountNumber, balance). Provide public getters/setters and methods for deposit() and withdraw() with proper validation.",
    submissions: [
      {
        _id: "sub2a",
        studentName: "Rohan Mehta",
        language: "java",
        code: `public class BankAccount {
    private String accountNumber;
    private double balance;

    public BankAccount(String accNo, double initialBalance) {
        this.accountNumber = accNo;
        this.balance = initialBalance;
    }

    public String getAccountNumber() { return accountNumber; }
    public double getBalance() { return balance; }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: " + amount + " | New Balance: " + balance);
        } else {
            System.out.println("Invalid deposit amount.");
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: " + amount + " | Remaining: " + balance);
        } else {
            System.out.println("Insufficient funds or invalid amount.");
        }
    }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount("ACC-001", 5000.0);
        acc.deposit(1500);
        acc.withdraw(2000);
        acc.withdraw(6000);
    }
}`,
        submittedAt: "2025-01-15T10:00:00Z",
      },
    ],
  },
  {
    _id: "day3",
    dayNumber: 3,
    title: "Day 3",
    question: "Demonstrate inheritance in Java. Create a base class 'Shape' with a method area(). Derive classes 'Circle', 'Rectangle', and 'Triangle' from it. Override area() in each derived class.",
    submissions: [
      {
        _id: "sub3a",
        studentName: "Sneha Patil",
        language: "java",
        code: `abstract class Shape {
    abstract double area();
    void display() {
        System.out.println("Area: " + area());
    }
}

class Circle extends Shape {
    double radius;
    Circle(double r) { this.radius = r; }
    @Override
    double area() { return Math.PI * radius * radius; }
}

class Rectangle extends Shape {
    double length, width;
    Rectangle(double l, double w) { this.length = l; this.width = w; }
    @Override
    double area() { return length * width; }
}

class Triangle extends Shape {
    double base, height;
    Triangle(double b, double h) { this.base = b; this.height = h; }
    @Override
    double area() { return 0.5 * base * height; }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        Shape[] shapes = { new Circle(5), new Rectangle(4, 6), new Triangle(3, 8) };
        for (Shape s : shapes) s.display();
    }
}`,
        submittedAt: "2025-01-20T11:00:00Z",
      },
    ],
  },
  {
    _id: "day4",
    dayNumber: 4,
    title: "Day 4",
    question: "Write a program to demonstrate polymorphism (method overloading and method overriding) in Java. Create a class 'Calculator' with overloaded add() methods for different data types.",
    submissions: [],
  },
  {
    _id: "day5",
    dayNumber: 5,
    title: "Day 5",
    question: "Implement an interface 'Playable' with methods play() and stop(). Create classes 'MusicPlayer' and 'VideoPlayer' that implement this interface with different behaviors.",
    submissions: [],
  },
  {
    _id: "day6",
    dayNumber: 6,
    title: "Day 6",
    question: "Write a Java program to demonstrate exception handling. Create a custom exception 'InsufficientAgeException'. Throw this exception when age < 18 in a method that validates voting eligibility.",
    submissions: [],
  },
  {
    _id: "day7",
    dayNumber: 7,
    title: "Day 7",
    question: "Implement a generic stack data structure in Java using generics (Stack<T>). Include push(), pop(), peek(), and isEmpty() methods. Demonstrate with Integer and String stacks.",
    submissions: [],
  },
  {
    _id: "day8",
    dayNumber: 8,
    title: "Day 8",
    question: "Write a Java program demonstrating the use of ArrayList, LinkedList, HashMap, and HashSet. Perform CRUD operations on each and compare their performance characteristics.",
    submissions: [],
  },
  {
    _id: "day9",
    dayNumber: 9,
    title: "Day 9",
    question: "Implement a multi-threaded Java application where two threads simultaneously update a shared counter. Demonstrate the problem without synchronization, then fix it using the synchronized keyword.",
    submissions: [],
  },
  {
    _id: "day10",
    dayNumber: 10,
    title: "Day 10",
    question: "Demonstrate file I/O in Java. Write a program to write student records to a text file and read them back. Handle FileNotFoundException and IOException appropriately.",
    submissions: [],
  },
  {
    _id: "day11",
    dayNumber: 11,
    title: "Day 11",
    question: "Write a Java program using lambda expressions and Stream API. Given a list of employees (name, salary, dept), filter employees with salary > 50000, sort by name, and print using streams.",
    submissions: [],
  },
  {
    _id: "day12",
    dayNumber: 12,
    title: "Day 12",
    question: "Implement the Singleton design pattern in Java. Ensure that only one instance of the class can be created. Demonstrate it is thread-safe using double-checked locking.",
    submissions: [],
  },
  {
    _id: "day13",
    dayNumber: 13,
    title: "Day 13",
    question: "Implement the Observer design pattern. Create a 'StockMarket' subject and 'Investor' observers. When the stock price changes, all observers should be notified automatically.",
    submissions: [],
  },
  {
    _id: "day14",
    dayNumber: 14,
    title: "Day 14",
    question: "Write a Java program to demonstrate serialization and deserialization. Serialize a 'Person' object to a file and deserialize it back. Handle NotSerializableException.",
    submissions: [],
  },
  {
    _id: "day15",
    dayNumber: 15,
    title: "Day 15",
    question: "Final Lab: Build a mini Library Management System using OOP principles learned throughout the course (Classes, Inheritance, Polymorphism, Encapsulation, Interfaces, Collections, and Exception Handling).",
    submissions: [],
  },
];
