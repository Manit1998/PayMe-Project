from blog.models import Blog

class Blog1:

	def CreateBlog(self,title,body):
		Blog.objects.update_or_create(title=title,defaults={"body":body})
		return "Blog Created Successfully"
		

	def DeleteBlog(self,title):
		blog=Blog.objects.filter(title=title)
		if blog:
			blog[0].delete()
			return "Blog Deleted Successfully"
		else :
			return ("Title Not Exist")

	def List_Body_Blog(self,title):
		blog=Blog.objects.filter(title=title)
		if blog:
			return ({"Body":blog[0].body})
		else :
			return ("Title Not Exist")

	def ShowAllBlog(self):
		blog=Blog.objects.all()
		list1=[]
		if (len(blog)>0):
			for i in range(len(blog)):
				list1.append(blog[i].title)
			return (list1)
		else:
			return ("No Blog Exist")
