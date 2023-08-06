from rest_framework import serializers
from .models import Module


class ModuleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Module
        fields = ("id", "module_code", "module_name")
        
    def create(self, validated_data):
        module = Module.objects.create(module_code=validated_data['module_code'],
                                        module_name=validated_data['module_name'],
                                         )
        module.save()
        return module