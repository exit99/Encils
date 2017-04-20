from rest_framework import permissions


def is_owner(user, obj):
    return obj.teacher == user


class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to view and edit it.
    """
    def has_object_permission(self, request, view, obj):
        assert hasattr(obj, 'teacher'), 'No "teacher" attr on {}.'.format(obj)
        return is_owner(request.user, obj)


class FromSMSGateway(permissions.BasePermission):
    # Will eventually check this.
    def has_object_permission(self, request, view, obj):
        return True
