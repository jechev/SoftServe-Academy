// proto way
function Student(name, group, rollno) {
  this.name = name;
  this.group = group;
  this.rollno = rollno;
}

Student.prototype.listAllProps = function() {
  return Object.keys(this);
}

let firstStudent = new Student('Goshko', 1, 1);
console.log(firstStudent.listAllProps());
// ["name", "group", "rollno"]

Student.prototype.deleteRollNo = function() {
  return delete this.rollno;
}

firstStudent.deleteRollNo();
// true

// Classes
class Teacher {
  constructor(name, discipline, socialNumber) {
    this.name = name;
    this.discipline = discipline;
    this.socialNumber = socialNumber;
  }

  listAllProps() {
    return this.Object.keys(this);
  }

  deleteDiscipline() {
    return delete this.discipline;
  }

  getSizeOfObj() {
    let size = Object.keys(this).length;
    return size;
  }
}