class ReadSaving {
    constructor({ incomeRepository, expenseRepository, readFactory }) {
        this.incomeRepository = incomeRepository;
        this.expenseRepository = expenseRepository;
        this.readFactory = readFactory;
    }

    async execute(props) {
        try {
            const incomeReader = this.readFactory.createReader({
                repository: this.incomeRepository,
            });

            const expenseReader = this.readFactory.createReader({
                repository: this.expenseRepository,
            });

            const incomes = await incomeReader.execute(props, [
                {
                    $group: {
                        _id: {
                            userId: "$userId",
                            year: { $year: "$date" },
                            month: { $month: "$date" },
                        },
                        totalIncome: { $sum: "$incomeAmount" },
                        incomes: {
                            $push: {
                                _id: "$_id",
                                incomeAmount: "$incomeAmount",
                                reasons: "$reasons",
                            },
                        },
                    },
                },
                {
                    $group: {
                        _id: { userId: "$_id.userId", year: "$_id.year" },
                        months: {
                            $push: {
                                month: "$_id.month",
                                monthName: {
                                    $switch: {
                                        branches: [
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 1],
                                                },
                                                then: "January",
                                            },
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 2],
                                                },
                                                then: "February",
                                            },
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 3],
                                                },
                                                then: "March",
                                            },
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 4],
                                                },
                                                then: "April",
                                            },
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 5],
                                                },
                                                then: "May",
                                            },
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 6],
                                                },
                                                then: "June",
                                            },
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 7],
                                                },
                                                then: "July",
                                            },
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 8],
                                                },
                                                then: "August",
                                            },
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 9],
                                                },
                                                then: "September",
                                            },
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 10],
                                                },
                                                then: "October",
                                            },
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 11],
                                                },
                                                then: "November",
                                            },
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 12],
                                                },
                                                then: "December",
                                            },
                                        ],
                                        default: "Unknown",
                                    },
                                },
                                totalIncome: "$totalIncome",
                                incomes: "$incomes",
                            },
                        },
                    },
                },
                {
                    $project: {
                        userId: "$_id.userId",
                        year: "$_id.year",
                        months: {
                            $arrayToObject: {
                                $map: {
                                    input: {
                                        $sortArray: {
                                            input: "$months",
                                            sortBy: { month: 1 },
                                        },
                                    },
                                    as: "m",
                                    in: {
                                        k: "$$m.monthName",
                                        v: {
                                            totalIncome: "$$m.totalIncome",
                                            incomes: "$$m.incomes",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                {
                    $group: {
                        _id: "$userId",
                        years: {
                            $push: {
                                k: { $toString: "$year" },
                                v: "$months",
                            },
                        },
                    },
                },
                {
                    $project: {
                        userId: "$_id",
                        years: { $arrayToObject: "$years" },
                    },
                },
            ]);

            console.debug("INCOMES ", incomes);

            const expenses = await expenseReader.execute(props, [
                {
                    $group: {
                        _id: {
                            userId: "$userId",
                            year: { $year: "$date" },
                            month: { $month: "$date" },
                        },
                        totalExpense: { $sum: "$expenseAmount" },
                        expenses: {
                            $push: {
                                _id: "$_id",
                                expenseAmount: "$expenseAmount",
                                reason: "$reason",
                            },
                        },
                    },
                },
                {
                    $group: {
                        _id: { userId: "$_id.userId", year: "$_id.year" },
                        months: {
                            $push: {
                                month: "$_id.month",
                                monthName: {
                                    $switch: {
                                        branches: [
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 1],
                                                },
                                                then: "January",
                                            },
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 2],
                                                },
                                                then: "February",
                                            },
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 3],
                                                },
                                                then: "March",
                                            },
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 4],
                                                },
                                                then: "April",
                                            },
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 5],
                                                },
                                                then: "May",
                                            },
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 6],
                                                },
                                                then: "June",
                                            },
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 7],
                                                },
                                                then: "July",
                                            },
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 8],
                                                },
                                                then: "August",
                                            },
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 9],
                                                },
                                                then: "September",
                                            },
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 10],
                                                },
                                                then: "October",
                                            },
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 11],
                                                },
                                                then: "November",
                                            },
                                            {
                                                case: {
                                                    $eq: ["$_id.month", 12],
                                                },
                                                then: "December",
                                            },
                                        ],
                                        default: "Unknown",
                                    },
                                },
                                totalExpense: "$totalExpense",
                                expenses: "$expenses",
                            },
                        },
                    },
                },
                {
                    $project: {
                        userId: "$_id.userId",
                        year: "$_id.year",
                        months: {
                            $arrayToObject: {
                                $map: {
                                    input: {
                                        $sortArray: {
                                            input: "$months",
                                            sortBy: { month: 1 },
                                        },
                                    },
                                    as: "m",
                                    in: {
                                        k: "$$m.monthName",
                                        v: {
                                            totalExpense: "$$m.totalExpense",
                                            expenses: "$$m.expenses",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                {
                    $group: {
                        _id: "$userId",
                        years: {
                            $push: {
                                k: { $toString: "$year" },
                                v: "$months",
                            },
                        },
                    },
                },
                {
                    $project: {
                        userId: "$_id",
                        years: { $arrayToObject: "$years" },
                    },
                },
            ]);

            console.debug("EXPENSES ", expenses);

            const combinedData = {};

            incomes.docs.forEach((incomeYear) => {
                const userId = incomeYear.userId;
                const years = incomeYear.years;

                if (!combinedData[userId]) {
                    combinedData[userId] = { years: {} };
                }

                Object.keys(years).forEach((year) => {
                    if (!combinedData[userId].years[year]) {
                        combinedData[userId].years[year] = {};
                    }

                    Object.keys(years[year]).forEach((monthName) => {
                        const incomeData = years[year][monthName];
                        const expenseData =
                            expenses.docs.find(
                                (exp) => exp.years[year]?.[monthName]
                            )?.years[year][monthName] || {};

                        combinedData[userId].years[year][monthName] = {
                            totalIncome: incomeData.totalIncome,
                            totalExpense: expenseData.totalExpense || 0,
                            savings:
                                (incomeData.totalIncome || 0) -
                                (expenseData.totalExpense || 0),
                        };
                    });
                });
            });

            return combinedData;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ReadSaving;
