import sys
import json
import datetime
from newspaper import Article

def to_json(data):
  return json.dumps(data, indent=1, ensure_ascii=False)

def date_to_string(dt):
  if isinstance(dt, datetime.datetime):
    return dt.__str__()

def clean_text(text):
  return text.replace("\n", " ")

def scrape(url):
  article = Article(url, language='hu')

  article.download()
  article.parse()
  article.nlp()
  
  article_dict = {
    'title': article.title,
    'authors': article.authors,
    'summary': clean_text(article.summary),
    'keywords': article.keywords,
    'published_at': date_to_string(article.publish_date),
    'cover': article.top_image,
    'content': clean_text(article.text),
    'html': clean_text(article.html)
  }
  
  return to_json(article_dict)

def scrape_article(url):
  try:
    return scrape(url)
  except Exception as error:
    error_dict = {
      'error': error.args[0]
    }

    return to_json(error_dict)

print(scrape_article(sys.argv[1]))