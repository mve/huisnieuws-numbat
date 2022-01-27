import React, { useCallback, useEffect, useState } from 'react';
import { checkLength } from '../../support/checker';
import { zipcodeIsValid } from '../../support/zipcode';
import FileInput from '../form/FileInput';
import TextAreaInput from '../form/TextAreaInput';
import TextInput from '../form/TextInput';
import UploadedImage from '../form/UploadedImage';
import ReachSelector from '../core/ReachSelector';
import { Reach } from '../../enums/reach';
import Sidebar from '../core/Sidebar';
import TagSelector from '../core/TagSelector';
import { Tag } from '../../types/tag';

type formDataTypes = {
  title: string,
  text: string,
  zipcode: string,
  image: string,
  reach: Reach,
  tags: Tag[],
};

type inputErrors = {
  zipcode: string | null,
  title: string | null,
  image: string | null
};

type EditTabProps = {
  formData: formDataTypes,
  saveArticle: Function,
  cancelEditArticle: Function,
  errors: inputErrors | null,
};

export const EditTab: React.FC<EditTabProps> = ({
  formData, saveArticle, cancelEditArticle, errors,
}) => {
  const [title, setTitle] = useState<string>(formData.title);
  const [zipcode, setZipcode] = useState<string>(formData.zipcode);
  const [text, setText] = useState<string>(formData.text);
  const [image, setImage] = useState<any>();
  const [imageUrl, setImageUrl] = useState(`/api/file/${formData.image}`);
  const [valid, setValid] = useState<boolean>(false);
  const [reach, setReach] = useState<Reach>(formData.reach);
  const [tags, setTags] = useState<Tag[]>(formData.tags);

  const onUpload = ({ target: { files } }) => {
    if (!files || !files[0]) return;

    const uploadedImage = files[0];

    setImage(uploadedImage);
    setImageUrl(URL.createObjectURL(uploadedImage));
  };

  const fieldsSet = useCallback((): boolean => (
    !!title && !!zipcode && !!text
  ), [title, zipcode, text]);

  const fieldsValid = useCallback((): boolean => (
    checkLength(title, 5, 100) && zipcodeIsValid(zipcode) && fieldsSet()
  ), [title, zipcode, fieldsSet]);

  useEffect(() => {
    setValid(fieldsValid());
  }, [title, zipcode, text, fieldsValid]);

  return (
    <div className="flex-col lg:flex lg:flex-row lg:justify-between">
      <form
        className="flex flex-col max-w-xl my-5"
        onSubmit={(e) => {
          e.preventDefault();
          saveArticle(title, zipcode, text, image, reach, tags);
        }}
      >
        <ReachSelector
          selected={reach}
          onChange={setReach}
          title="Kies het bereik waarin het bericht te zien moet zijn"
        />

        <TagSelector
          title="Kies tags die bij uw bericht passen"
          onChange={setTags}
          maxAmountTags={3}
          selected={tags}
        />

        <TextInput
          value={title}
          name="title_input"
          label="Titel"
          placeholder="Titel"
          instruction="min 5 - max 100"
          onChange={setTitle}
          classes={errors?.title}
        />

        <TextInput
          value={zipcode}
          name="postcode_input"
          label="Postcode"
          placeholder="1234 AB"
          instruction="4 cijfers 2 letters: 1111 AA"
          onChange={setZipcode}
          classes={errors?.zipcode}
        />

        <TextAreaInput
          value={text}
          name="inhoud_input"
          label="Inhoud"
          placeholder="Schijf hier de inhoud van uw artikel"
          onChange={setText}
        />

        {imageUrl !== '' && <UploadedImage url={imageUrl} />}

        <FileInput onUpload={onUpload} classes={errors?.image} />

        <div className="flex w-full justify-around">
          <button
            type="button"
            onClick={(e) => cancelEditArticle(e)}
            className="bg-gray-500 px-4 py-2 rounded-md hover:bg-gray-400 text-white font-medium text-sm"
          >
            Annuleer
          </button>
          <button
            disabled={!valid}
            type="submit"
            className="disabled:opacity-50 disabled:cursor-not-allowed max-w-xs justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Opslaan
          </button>
        </div>
      </form>
      <Sidebar
        reach={zipcodeIsValid(zipcode) && (reach)}
        zipcode={zipcodeIsValid(zipcode) && (zipcode)}
        articles={[]}
      />
    </div>
  );
};
export default EditTab;
