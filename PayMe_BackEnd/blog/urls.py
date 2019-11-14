from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^create/', views.create),
	url(r'^delete/', views.delete),
	url(r'^list_blog/', views.list_all),
	url(r'^blog_body/', views.blog_body),
	]

