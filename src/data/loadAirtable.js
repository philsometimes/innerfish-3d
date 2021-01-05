import firebase from '../firebaseInit'

const firebaseAirtable = firebase.functions().httpsCallable('loadAirtable')

const formatJSON = (data) => {
  const formatted = []
  const template = {
    "uid": "",
    "url": "",
    "scientific": "",
    "common": "",
    "group": "",
    "chapter": [],
    "showstopper": false,
    "default": false,
    "week": [],
    "type": "",
    "section": "",
    "sectionIndex": "",
    "caption": "",
  }
  for (let datum of data) {
    const newDatum = {
      "uid": datum['UID'] ? datum['UID'] : template['UID'],
      "url": datum['Link'] ? datum['Link'] : template['url'],
      "scientific": datum['Scientific Name'] ? datum['Scientific Name'] : template['scientific'],
      "common": datum['Other Name'] ? datum['Other Name'] : template['common'],
      "group": datum['Group'] ? datum['Group'] : template['group'],
      "chapter": datum['Chapter'] ? datum['Chapter'] : template['chapter'],
      "showstopper": datum['Showstopper'] ? datum['Showstopper'] : template['showstopper'],
      "default": datum['Default'] ? datum['Default'] : template['default'],
      "week": datum['Week'] ? datum['Week'] : template['week'],
      "type": datum['Type'] ? datum['Type'] : template['type'],
      "section": datum['Section'] ? datum['Section'] : template['section'],
      "sectionIndex": datum['SectionIndex'] ? datum['SectionIndex'] : template['sectionIndex'],
      "caption": datum['Caption'] ? datum['Caption'] : template['caption'],
    }
    formatted.push(newDatum)
  }
  return formatted
}

export const loadAirtable = async () => {
  const data = await firebaseAirtable()
  const formatted = formatJSON(data.data)
  return formatted
}
