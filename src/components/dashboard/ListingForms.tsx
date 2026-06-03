'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  createListing,
  updateListing,
  addListingImage,
} from '@/app/[locale]/(app)/dashboard/listings/actions';
import { INITIAL_ACTION_STATE } from '@/lib/admin-types';
import type { AdminListing } from '@/lib/admin-listings';

function Submit({ label, busy }: { label: string; busy: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn" disabled={pending}>
      {pending ? busy : label}
    </button>
  );
}

export function NewListingForm() {
  const [state, action] = useFormState(createListing, INITIAL_ACTION_STATE);
  return (
    <form action={action} className="lead-form" style={{ maxWidth: 560 }}>
      <div className="form-field">
        <label htmlFor="nl-title">Title</label>
        <input id="nl-title" name="title" type="text" />
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="nl-cat">Category</label>
          <select id="nl-cat" name="category" defaultValue="residential">
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="offplan">Off-plan</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="nl-tx">Sale or rent</label>
          <select id="nl-tx" name="transaction_type" defaultValue="sale">
            <option value="sale">For sale</option>
            <option value="rent">For rent</option>
          </select>
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="nl-slug">Slug (optional)</label>
        <input id="nl-slug" name="slug" type="text" placeholder="auto" />
      </div>
      <div className="form-actions">
        <Submit label="Create draft" busy="Creating…" />
        {state.error && <span className="form-error">{state.error}</span>}
      </div>
    </form>
  );
}

export function ListingEditForm({ listing }: { listing: AdminListing }) {
  const [state, action] = useFormState(updateListing, INITIAL_ACTION_STATE);
  return (
    <form action={action} className="lead-form">
      <input type="hidden" name="id" value={listing.id} />
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="le-title">Title</label>
          <input id="le-title" name="title" type="text" defaultValue={listing.title} />
        </div>
        <div className="form-field">
          <label htmlFor="le-slug">Slug</label>
          <input id="le-slug" name="slug" type="text" defaultValue={listing.slug} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="le-cat">Category</label>
          <select id="le-cat" name="category" defaultValue={listing.category}>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="offplan">Off-plan</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="le-tx">Sale or rent</label>
          <select id="le-tx" name="transaction_type" defaultValue={listing.transaction_type}>
            <option value="sale">For sale</option>
            <option value="rent">For rent</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="le-price">Price</label>
          <input id="le-price" name="price" type="number" defaultValue={listing.price ?? ''} />
        </div>
        <div className="form-field">
          <label htmlFor="le-cur">Currency</label>
          <input id="le-cur" name="currency" type="text" defaultValue={listing.currency} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="le-beds">Bedrooms</label>
          <input id="le-beds" name="bedrooms" type="number" defaultValue={listing.bedrooms ?? ''} />
        </div>
        <div className="form-field">
          <label htmlFor="le-baths">Bathrooms</label>
          <input id="le-baths" name="bathrooms" type="number" defaultValue={listing.bathrooms ?? ''} />
        </div>
        <div className="form-field">
          <label htmlFor="le-size">Size (sqft)</label>
          <input id="le-size" name="size_sqft" type="number" defaultValue={listing.size_sqft ?? ''} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="le-comm">Community</label>
          <input id="le-comm" name="community" type="text" defaultValue={listing.community ?? ''} />
        </div>
        <div className="form-field">
          <label htmlFor="le-dev">Developer</label>
          <input id="le-dev" name="developer" type="text" defaultValue={listing.developer ?? ''} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="le-comp">Completion status</label>
          <input id="le-comp" name="completion_status" type="text" defaultValue={listing.completion_status ?? ''} />
        </div>
        <div className="form-field">
          <label htmlFor="le-rera">RERA permit</label>
          <input id="le-rera" name="rera_permit_number" type="text" defaultValue={listing.rera_permit_number ?? ''} />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="le-dld">DLD permit</label>
        <input id="le-dld" name="dld_permit" type="text" defaultValue={listing.dld_permit ?? ''} />
      </div>
      <div className="form-field">
        <label htmlFor="le-desc">Description (Markdown)</label>
        <textarea id="le-desc" name="description" rows={10} defaultValue={listing.description ?? ''} className="mono" />
      </div>
      <div className="form-field">
        <label htmlFor="le-amen">Amenities (comma-separated)</label>
        <input id="le-amen" name="amenities" type="text" defaultValue={listing.amenities.join(', ')} />
      </div>
      <label className="check-field">
        <input type="checkbox" name="featured" defaultChecked={listing.featured} /> Featured
      </label>
      <div className="form-actions">
        <Submit label="Save changes" busy="Saving…" />
        {state.ok && <span className="form-hint">Saved.</span>}
        {state.error && <span className="form-error">{state.error}</span>}
      </div>
    </form>
  );
}

export function ListingImageUploader({ listingId }: { listingId: string }) {
  const [state, action] = useFormState(addListingImage.bind(null, listingId), INITIAL_ACTION_STATE);
  return (
    <form action={action} className="asset-uploader">
      <input type="file" name="file" accept="image/*" className="file-input" />
      <div className="form-actions">
        <button type="submit" className="btn-ghost">Add image</button>
        {state.ok && <span className="form-hint">Added.</span>}
        {state.error && <span className="form-err">{state.error}</span>}
      </div>
    </form>
  );
}
