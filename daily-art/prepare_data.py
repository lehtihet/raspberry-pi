import os
import shutil
import json

def moveGoodArtworks(source, target, charLimit = 300):
	if not os.path.exists(target):
		os.makedirs(target)

	files = os.listdir(source)
	total = len(files)

	copied = 0
	processed = 0

	for file in files:
		if file.endswith('.json'):
			path = os.path.join(source, file)

			try:
				with open(path, 'r', encoding='utf-8') as f:
					data = json.load(f)

				description = data.get('description') or ''
				classType = data.get('artwork_type_title') or ''
				if len(description) > charLimit and data.get('image_id') and classType in ['Painting']: #['Painting', 'Drawing and Watercolor']:
					targetPath = os.path.join(target, file)
					shutil.copy(path, targetPath)
					copied += 1
				processed += 1
			except Exception as e:
				print('Error :(')
		if processed % 10000 == 0:
			print(f'Files processed: {processed} out of {total}')

	print(f'Finished. Total files copied: {copied}')

if __name__ == "__main__":
	dirPath = os.getcwd()
	source = '/'.join([dirPath, 'artworks_full'])
	target = '/'.join([dirPath, 'artworks_filtered/unused'])

	moveGoodArtworks(source, target)
