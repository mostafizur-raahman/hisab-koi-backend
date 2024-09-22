class ReadIncome {
    constructor({ incomeRepository, readFactory }) {
        this.incomeRepository = incomeRepository;
        this.readFactory = readFactory;
    }

    async execute(props) {
        try {
            const reader = this.readFactory.createReader({
                repository: this.incomeRepository,
            });

            return await reader.execute(props, [
                // Step 1: Project year and month from the date field
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
                // Step 2: Group by userId and year, creating a structured months object
                {
                    $group: {
                        _id: { userId: "$_id.userId", year: "$_id.year" },
                        months: {
                            $push: {
                                month: "$_id.month", // keep the month number for sorting
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
                // Step 3: Sort months array by month number
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
                                    }, // sort by month
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
                // Step 4: Group again by userId to finalize the structure
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
                        years: {
                            $arrayToObject: "$years",
                        },
                    },
                },
            ]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ReadIncome;
