from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

UserModel = get_user_model()

class EmailOrUsernameModelBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = UserModel.objects.get(email=username)
        except UserModel.DoesNotExist:
            try:
                user = UserModel.objects.get(username=username)
            except UserModel.DoesNotExist:
                return None  # Return None if user is not found
        if user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None  # Return None if password is incorrect
