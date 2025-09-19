// src/pages/DataPrivacy.jsx
export default function DataPrivacy() {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-black tracking-tight mb-4">Data Privacy</h1>
        <div className="prose max-w-none text-subtle-light">
          <p>
            Our commitment to your data privacy is paramount. This page outlines how we handle and protect the data you entrust to us.
          </p>
          <h2 className="text-2xl font-bold mt-6">File Handling</h2>
          <p>
            All files uploaded to our service are treated as confidential. They are stored on secure, encrypted servers and are only accessible by the automated conversion engine. No human ever looks at your files.
          </p>
          <p>
            All original and converted files are permanently deleted from our servers automatically after 24 hours to ensure your data remains your own.
          </p>
          <h2 className="text-2xl font-bold mt-6">Your Rights</h2>
          <p>
            You have the right to know how your data is processed. We do not use your data for any purpose other than the file conversion service you have requested. We do not sell or share your data with third parties. Reach out to the developers for more information using this email: <a href="mailto:bhargav.mohith101@gmail.com">bhargav.mohith101@gmail.com</a>.
          </p>
        </div>
      </div>
    );
}