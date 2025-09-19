// src/pages/PrivacyPolicy.jsx
export default function PrivacyPolicy() {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-black tracking-tight mb-4">Privacy Policy</h1>
        <div className="prose max-w-none text-subtle-light">
          <p>
            This is the Privacy Policy for the 2GLB application. Your privacy is important to us.
            It is our policy to respect your privacy regarding any information we may collect from you across our website.
          </p>
          <h2 className="text-2xl font-bold mt-6">Information We Collect</h2>
          <p>
            We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
          </p>
          <p>
            Uploaded files are stored temporarily on our servers solely for the purpose of conversion and are automatically deleted after a short period. We do not access, view, or share the content of your files.
          </p>
          <h2 className="text-2xl font-bold mt-6">Security</h2>
          <p>
            We take security seriously and take reasonable measures to protect your information. However, no method of transmission over the internet or method of electronic storage is 100% secure.
          </p>
        </div>
      </div>
    );
}