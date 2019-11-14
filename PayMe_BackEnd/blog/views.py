from django.shortcuts import render

from blog.blog import Blog1
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json

@csrf_exempt
def create(request):
	try:
		if(request.method == "POST"):
			try:
				received_json_data=json.loads(request.body)
				if "title" in received_json_data:
					title=received_json_data["title"]
				else:
					raise Exception("Title is required")
				if "body" in received_json_data:
					body= received_json_data["body"]
				else:
					raise Exception("Body is required")

			except Exception as e:
				return JsonResponse({'result':str(e)})

			result=Blog1().CreateBlog(title,body)
			return JsonResponse({"status":"ok","result":result})

		else:
			return JsonResponse({'result':'error:get method'})
	except Exception as e:
		return JsonResponse({'status':'ok','result':"some error"})

@csrf_exempt
def delete(request):
	try:
		if(request.method == "POST"):
			try:
				received_json_data=json.loads(request.body)
				if "title" in received_json_data:
					title=received_json_data["title"]
				else:
					raise Exception("Title is required")

			except Exception as e:
				return JsonResponse({'result':'enter data'})

			result=Blog1().DeleteBlog(title)
			return JsonResponse({"status":"ok","result":result})

		else:
			return JsonResponse({'result':'error:get method'})
	except Exception as e:
		return JsonResponse({'status':'ok','result':"some error"})


@csrf_exempt
def list_all(request):
	try:
		if(request.method == "POST"):

			result=Blog1().ShowAllBlog()
			return JsonResponse({"status":"ok","result":{"Titles":result}})

		else:
			return JsonResponse({'result':'error:get method'})
	except Exception as e:
		return JsonResponse({'status':'ok','result':"some error"})

@csrf_exempt
def blog_body(request):
	try:
		if(request.method == "POST"):
			try:
				received_json_data=json.loads(request.body)
				if "title" in received_json_data:
					title=received_json_data["title"]
				else:
					raise Exception("Title is required")

			except Exception as e:
				return JsonResponse({'result':'enter data'})

			result=Blog1().List_Body_Blog(title)
			return JsonResponse({"status":"ok","result":result})

		else:
			return JsonResponse({'result':'error:get method'})
	except Exception as e:
		return JsonResponse({'status':'ok','result':"some error"})

	