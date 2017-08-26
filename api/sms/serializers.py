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


# Redux-Form + Material UI sends back True or '' from checkbox fields.
serializers.BooleanField.FALSE_VALUES.add('')


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ('pk', 'email', 'sms')


class ClassroomSerializer(serializers.ModelSerializer):
    assignments_given = serializers.ReadOnlyField()

    class Meta:
        model = Classroom
        fields = ('pk', 'name', 'school', 'created', 'assignments_given')
        read_only_fields = ('pk', 'created')


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
    question_count = serializers.ReadOnlyField()
    
    class Meta:
        model = Assignment
        fields = ('pk', 'name', 'created', 'hide_answers', 'one_at_a_time', 'question_count')
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
