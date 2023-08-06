from django.contrib import admin
from .models import Module

# Register your models here.
@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    pass