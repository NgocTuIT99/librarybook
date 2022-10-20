let userLoginInput = {
    email: { type: "email", optional: false },
    password: { type: "string", optional: false },
};

let userCreateInput = {
    email: { type: "email", optional: false },
    password: { type: "string", optional: false },
    fullName: { type: "string", optional: false },
    address: { type: "string", optional: true },
    phoneNumber: { type: "string", optional: true },
    photoURL: { type: "string", optional: true },
    providerId: { type: "string", optional: true },
};

let userEditInput = {
    id: { type: "number", optional: false },
    email: { type: "email", optional: true },
    fullName: { type: "string", optional: true },
    address: { type: "string", optional: true },
    phoneNumber: { type: "string", optional: true },
    photoURL: { type: "string", optional: true },
    providerId: { type: "string", optional: true },
}

let userDeleteInput = {
    id: { type: "number", optional: false },
}

let bookCreateInput = {
    name: { type: "string", optional: false },
    author: { type: "string", optional: false },
    categoryId: { type: "number", optional: false },
    amount: { type: "number", optional: false },
    image: { type: "string", optional: true },
}

let bookGetAllInput = {
    id: { type: "string", optional: true },
}

let bookEditInput = {
    id: { type: "number", optional: false },
    name: { type: "string", optional: false },
    author: { type: "string", optional: false },
    categoryId: { type: "number", optional: false },
    amount: { type: "number", optional: false },
    image: { type: "string", optional: true },
}

let bookDeleteInput = {
    id: { type: "number", optional: false },
}

let categoryCreateInput = {
    name: { type: "string", optional: false },
    description: { type: "string", optional: true },
}

let categoryEditInput = {
    id: { type: "number", optional: false },
    name: { type: "string", optional: false },
    description: { type: "string", optional: true },
}

let categoryDeleteInput = {
    id: { type: "number", optional: false },
}

let historyGetAllInput = {
    id: { type: "string", optional: false },
}

let historyBorrowBookInput = {
    bookId: { type: "number", optional: false },
    userId: { type: "number", optional: false },
}

let historyReturnBookInput = {
    bookId: { type: "number", optional: false },
    userId: { type: "number", optional: false },
}

module.exports = {
    userLoginInput, userCreateInput, userEditInput, userDeleteInput,
    bookCreateInput, bookGetAllInput, bookEditInput, bookDeleteInput,
    categoryEditInput, categoryDeleteInput, categoryCreateInput,
    historyGetAllInput, historyBorrowBookInput, historyReturnBookInput,
};