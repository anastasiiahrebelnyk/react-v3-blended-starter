import Section from '../Section/Section';
import Container from '../Container/Container';
import { getPhotos } from '../../services/photos';
import Form from '../Form/Form';
import { useState } from 'react';
import type { Photo } from '../../types/photo';
import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import PhotosGallery from '../PhotosGallery/PhotosGallery';
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleSearch = async (query: string) => {
    try {
      const fetchedPhotos = await getPhotos(query);
      if (fetchedPhotos.length === 0) {
        toast.error('Not found photos for your request');
      }
      setIsError(false);
      setIsLoading(true);
      setPhotos([]);
      setPhotos(fetchedPhotos);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsError(false);
    }
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSearch}></Form>
          {isLoading && <Loader />}
          {isError && <Text textAlign="center">Something went wrong </Text>}
          {photos.length > 0 && (
            <PhotosGallery photos={photos} onSelect={() => {}}></PhotosGallery>
          )}
          <Toaster position="top-center" />
        </Container>
      </Section>
    </>
  );
}
