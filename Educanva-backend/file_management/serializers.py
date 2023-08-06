from rest_framework import serializers
from .models import File, Submission
from module.serializers import ModuleSerializer
from accounts.serializers import UserCreateSerializer

class FileSerializer(serializers.ModelSerializer):
    # module = ModuleSerializer()
    # uploaded_by = UserCreateSerializer()
    # file_url = serializers.SerializerMethodField()
    
    class Meta:
        model = File
        fields = ('id', 'file', 'name', 'uploaded_by', 'description', 'created_at', 'module', 'content_type', 'due_date', 'due_time')
        
        
    # def create(self, validated_data):
    #     file = File.objects.create(name=validated_data['name'],
    #                                     description=validated_data['description'],
    #                                     file=validated_data['file'],
    #                                     module=validated_data['module'],
    #                                     uploaded_by=self.context['request'].user,
    #                                     uploaded_at=validated_data['uploaded_at'],
    #                                         )
    #     return file
    
    
class SubmissionSerializer(serializers.ModelSerializer):
    
    def getFullname(self, obj):
	    return obj.uploaded_by.first_name + ' ' + obj.uploaded_by.last_name
 
    def getAssignmentName(self, obj):
        return obj.assignment_id.name
 
    uploaded_by_fullname = serializers.SerializerMethodField("getFullname")
    assignment_name = serializers.SerializerMethodField("getAssignmentName")

    class Meta:
        fields = ['id', 'assignment_id', 'assignment_name', 'file', 'uploaded_by', 'uploaded_by_fullname', 'module', 'marks', 'marked_by']
        model = Submission
        


class SubmissionUpdateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Submission
        fields = ('file',)

        
class SubmissionMarksUpdateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Submission
        fields = ('marks', 'marked_by')
        