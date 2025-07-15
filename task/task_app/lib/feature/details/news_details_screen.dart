import 'package:flutter/material.dart';
import 'package:task_app/model/post_model.dart';

class NewsDetailsScreen extends StatefulWidget {
  PostModel model;
  NewsDetailsScreen({super.key, required this.model});

  @override
  State<NewsDetailsScreen> createState() => _NewsDetailsScreenState();
}

class _NewsDetailsScreenState extends State<NewsDetailsScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('News Details')),
      body: Container(
        padding: EdgeInsets.symmetric(horizontal: 10, vertical: 10),
        child: Column(
          children: [
            Text(
              'Title ${widget.model.title}',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
            ),
            SizedBox(height: 15),
            Text('News details  ${widget.model.body}'),
          ],
        ),
      ),
    );
  }
}
