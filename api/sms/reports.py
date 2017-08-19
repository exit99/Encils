from itertools import groupby
from statistics import mean

from sms.models import Answer, Student


def classroom_report(classroom):
    students = Student.objects.filter(classroom=classroom).all()
    return {
        'mean_score': classroom.gpa,
        'answer_rate': classroom.answer_rate,
        'students': [student_report(classroom, student) for student in students],
    }


def student_report(classroom, student):
    answers = Answer.objects.filter(classroom=classroom, student=student).all()
    by_assignments = {}
    for answer in answers:
        assignment = answer.question.assignment
        by_assignments.setdefault(assignment, [])
        by_assignments[assignment].append(answer)

    return {
        'name': student.name,
        'mean_score': mean([answer.grade for answer in answers]),
        'assignments': {
            assignment.name: {
                'mean_score': mean([answer.grade for answer in answers])
                for assignment, answers in by_assignments.items() 
            }
        },
    }
