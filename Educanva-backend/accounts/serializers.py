from rest_framework import serializers
from .models import User
from module.models import Module
from module.serializers import ModuleSerializer
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags


class UserCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        extra_kwargs = {'password': {'write_only': True}}
        fields = ("id", "first_name", "last_name", "email", "user_type", "password")
        read_only_fields = ("id",)  

    def create(self, validated_data):
        password = validated_data.pop('password')
        print(password)
        user = User.objects.create(first_name=validated_data['first_name'],
                                        last_name=validated_data['last_name'],
                                        email=validated_data['email'],
                                        user_type=validated_data['user_type'],
                                         )
        user.set_password(password)
        user.save()
        
         # Send email to the user
        subject = 'Account Created'
        message = render_to_string('account_created_email.html', {'user': user, 'password': password})
        plain_message = strip_tags(message)
        from_email = settings.EMAIL_HOST_USER  # Use your email host user
        to_email = user.email
        send_mail(subject, plain_message, from_email, [to_email], html_message=message)
        
        return user
    
class UserUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        extra_kwargs = {'password': {'write_only': True}}
        fields = ("id", "first_name", "last_name", "email", "user_type", "modules")
        read_only_fields = ("id",)  

    def create(self, validated_data):
        user = User.objects.create(first_name=validated_data['first_name'],
                                        last_name=validated_data['last_name'],
                                        email=validated_data['email'],
                                        user_type=validated_data['user_type'],
                                        modules=validated_data['modules'],
                                         )
        user.set_password(validated_data['password'])
        user.save()
        return user
    

class UserModuleSerializer(serializers.ModelSerializer): 
    modules = ModuleSerializer(many=True)

    class Meta:
        model = User
        fields = ("id", "first_name", "last_name", "email", "user_type", "modules")
        read_only_fields = ("id",)  

    def update(self, instance, validated_data):
        modules_data = validated_data.pop('modules', [])
        modules = []
        for module_data in modules_data:
            module, created = Module.objects.get_or_create(**module_data)
            modules.append(module)
        instance.modules.set(modules)
        return super().update(instance, validated_data)
    


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
