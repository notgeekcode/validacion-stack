-- Create storage bucket for images
insert into storage.buckets (id, name, public)
values ('place-images', 'place-images', true);

insert into storage.buckets (id, name, public)
values ('event-images', 'event-images', true);

-- RLS policies for place-images bucket
create policy "Anyone can view place images"
on storage.objects for select
using (bucket_id = 'place-images');

create policy "Authenticated users can upload place images"
on storage.objects for insert
with check (
  bucket_id = 'place-images' 
  and auth.role() = 'authenticated'
);

create policy "Users can update own place images"
on storage.objects for update
using (
  bucket_id = 'place-images' 
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can delete own place images"
on storage.objects for delete
using (
  bucket_id = 'place-images' 
  and auth.uid()::text = (storage.foldername(name))[1]
);

-- RLS policies for event-images bucket
create policy "Anyone can view event images"
on storage.objects for select
using (bucket_id = 'event-images');

create policy "Authenticated users can upload event images"
on storage.objects for insert
with check (
  bucket_id = 'event-images' 
  and auth.role() = 'authenticated'
);

create policy "Users can update own event images"
on storage.objects for update
using (
  bucket_id = 'event-images' 
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can delete own event images"
on storage.objects for delete
using (
  bucket_id = 'event-images' 
  and auth.uid()::text = (storage.foldername(name))[1]
);