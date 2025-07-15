import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:task_app/model/post_model.dart';

class ApiService {
  static const baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  // This Methods Fetch the news

  Future<List<PostModel>> fetchNews() async {
    final response = await http.get(
      Uri.parse('https://jsonplaceholder.typicode.com/posts'),
    );

    if (response.statusCode == 200) {
      final List<dynamic> jsonList = jsonDecode(response.body);
      return PostModel.fromJsonList(jsonList);
    } else {
      throw Exception('Failed to load posts');
    }
  }
}
