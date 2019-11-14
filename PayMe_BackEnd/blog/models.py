from django.db import models

class Blog(models.Model):
	title = models.CharField(max_length=255, unique=True)
	body = models.CharField(max_length=10000, blank=True, null=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		managed = True
		db_table = 'blog'

	def __str__(self):
		return self.title
