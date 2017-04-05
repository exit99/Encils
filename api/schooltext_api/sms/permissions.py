from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to view and edit it.
    """
    def has_object_permission(self, request, view, obj):
        assert hasattr(obj, 'teacher'), 'No "teacher" attr on {}.'.format(obj)
        return obj.teacher == request.user


class FromSMSGateway(permissions.BasePermission):
    # Will eventually check this.
    def has_object_permission(self, request, view, obj):
        return True
