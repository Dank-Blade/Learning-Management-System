from django.db import models
from accounts.models import User
from module.models import Module
# Create your models here.


def get_upload_path(instance, filename):
    """
    Returns the upload path for a content file based on the module name.
    """
    module_code = instance.module.module_code
    return f"content/{module_code}/{filename}"


def get_submission_upload_path(instance, filename):
    """
    Returns the upload path for a content file based on the module name.
    """
    module_code = instance.module.module_code
    return f"submission/{module_code}/{filename}"


class File(models.Model):
    file = models.FileField(upload_to=get_upload_path)
    name = models.CharField(max_length=255)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField()
    OPTIONS = (
        ('Content', 'Content'),
        ('Assignment', 'Assignment'),
        ('Exam', 'Exam'),
    )
    content_type = models.CharField(max_length=10, choices=OPTIONS, default='Content')
    created_at = models.DateTimeField(auto_now_add=True)
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    
    due_date = models.DateField(null=True, blank=True)
    due_time = models.TimeField(null=True, blank=True)
    

    def __str__(self):
        return self.name
    
    class Meta:
        app_label = 'file_management'
        

class Submission(models.Model):
    file = models.FileField(upload_to=get_submission_upload_path)
    assignment_id = models.ForeignKey(File, on_delete=models.CASCADE, related_name='assignment')
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    marks = models.IntegerField(null=True, blank=True)
    marked_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='marked_by', null=True, blank=True)
    
    

    def __str__(self):
        return self.name
    