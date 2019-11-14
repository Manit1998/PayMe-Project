from django.contrib import admin

# Register your models here.
from .models import *

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
	list_display=['id','title','body','created_at','updated_at']
	ordereing=['-updated_at']
	search_fields=['id','title','body','created_at','updated_at']
	list_per_page=20
