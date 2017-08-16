from rest_framework import serializers

from sms.models import (
    Answer,
    Assignment,
    Attendance,
    Classroom,
    Question,
    Student,
    Teacher
)


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ('pk', 'email', 'sms')


class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = ('pk', 'name', 'school', 'created', 'assignments_given')
        read_only_fields = ('pk', 'created', 'assignments_given')


class StudentSerializer(serializers.ModelSerializer):
    attendance = serializers.ReadOnlyField()

    class Meta:
        model = Student
        fields = ('pk', 'name', 'classroom', 'phone', 'created', 'attendance')
        read_only_fields = ('pk', 'created')

    def validate_classroom(self, classroom):
        if classroom.teacher != self.context["request"].user:
            msg = 'Invalid pk "{}" - object does not exist.'.format(classroom.pk)
            raise serializers.ValidationError(msg)
        return classroom


class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ('pk', 'name', 'created')
        read_only_fields = ('pk', 'created')


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('pk', 'assignment', 'text', 'created')
        read_only_fields = ('pk', 'created')

    def validate_assignment(self, assignment):
        if assignment.teacher != self.context["request"].user:
            msg = 'Invalid pk "{}" - object does not exist.'.format(assignment.pk)
            raise serializers.ValidationError(msg)
        return assignment


class AnswerSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)

    class Meta:
        model = Answer
        fields = ('pk', 'student', 'question', 'classroom', 'text', 'grade', 'created')
        read_only_fields = ('pk', 'student', 'question', 'classroom', 'text', 'created')


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ('pk', 'student', 'classroom', 'date', 'status')
        read_only_fields = ('pk', 'date')
