import sys
import json
import datetime
from newspaper import Article

def date_to_string(dt):
  if isinstance(dt, datetime.datetime):
    return dt.__str__()

def scrape_article(url):
  article = Article(url, language='hu')

  article.download()
  article.parse()
  article.nlp()

  article_dict = {
    'title': article.title,
    'authors': article.authors,
    'summary': article.summary,
    'keywords': article.keywords,
    'published_at': date_to_string(article.publish_date),
    'cover': article.top_image
  }

  article_json = json.dumps(article_dict, indent=1, ensure_ascii=False)

  print(article_json)

scrape_article(sys.argv[1])