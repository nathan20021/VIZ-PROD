import json
f = open('/Users/nathan/Desktop/Personal/VIZ-PROD/src/utils/initials.json')
data = json.load(f)
dataCopy = data['defaultNodes']
for ind, item in enumerate(data['defaultNodes']):
    if item["type"] == "textUpdater":
        dataCopy[ind]["data"]["bgColor"] = {
            "r": 255,
            "g": 255,
            "b": 255,
            "a": 0
        }
        dataCopy[ind]["data"]["fontColor"] = {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 1
        }
        print(dataCopy[ind]["data"])

dictionary = {
    "defaultEdges" : data['defaultEdges'],
    "defaultNodes" : dataCopy
}
# Serializing json
json_object = json.dumps(dictionary, indent=4)
 
# Writing to sample.json
with open("/Users/nathan/Desktop/Personal/VIZ-PROD/src/utils/out.json", "w") as outfile:
    outfile.write(json_object)