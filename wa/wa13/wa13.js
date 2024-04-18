// Problem 1
HR1 = [
            {
                "firstName": "Sam",
                "department": "Tech",
                "designation": "Manager",
                "salary": 40000,
                "raiseEligible": true
            },
            {
                "firstName": "Mary",
                "department": "Finance",
                "designation": "Trainee",
                "salary": 18500,
                "raiseEligible": true
            },
            {
                "firstName": "Bill",
                "department": "HR",
                "designation": "Executive",
                "salary": 21200,
                "raiseEligible": false
            }
        ];
console.log(HR1);

// Problem 2
HR2 = {
            "companyName": "Tech Stars",
            "website": "www.techstars.site",
            "employees": HR1
        };
console.log(HR2);

// Problem 3
const Anna = {
    "firstName": "Anna",
    "department": "Tech",
    "designation": "Executive",
    "salary": 25600,
    "raiseEligible": false
};
HR2.employees.push(Anna);
console.log(HR2)

// Problem 4
function calculateSalary(json) {
    let totalSalary = 0;
    for(let i = 0; i < json.employees.length; i+=1)
        totalSalary += json.employees[i].salary;
    console.log(totalSalary);
}
calculateSalary(HR2);

// Problem 5
function giveRaises(json) {
    for(let i = 0; i < json.employees.length; i+=1) {
        if(json.employees[i].raiseEligible) {
            json.employees[i].salary *= 1.1;
            json.employees[i].raiseEligible = false;
        }
    }
    return json;
}
HR2 = giveRaises(HR2)
console.log(HR2)

// Problem 6
function setWorkFromHome(json, wfh) {
    for(let i = 0; i < json.employees.length; i+=1) {
        json.employees[i].wfh = false;
        for(let j = 0; j < wfh.length; j+=1) {
            if(json.employees[i].firstName == wfh[j])
                json.employees[i].wfh = true; 
        }
    }
    return json
}
HR2 = setWorkFromHome(HR2, ["Anna", "Sam"]);
console.log(HR2)


