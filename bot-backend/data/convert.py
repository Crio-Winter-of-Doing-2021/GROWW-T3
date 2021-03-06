import json
import os

source_dir_path = os.path.dirname(__file__) + '/GROWW-REST-FAQs'
destination_dir_path = os.path.dirname(__file__) + '/GROWW-REST-FAQs-Format'

files = os.listdir(source_dir_path)

for file_name in files:
  try:
    with open(source_dir_path + '/' + file_name) as file:
      data = json.load(file)
      res_data = {}

      for i in data:
        res_data[i] = []
        for j in data[i]:
          try:
            obj = {}
            obj['id'] = j['id']
            obj['question'] = j['questionTitle']
            obj['answer'] = j['answerText']
            obj['answerHtml'] = j['answerHtml']
            res_data[i].append(obj)
          except:
            pass

      with open(destination_dir_path + '/' + file_name, 'w') as json_file:
        json.dump(res_data, json_file)
  except:
    print(file_name)