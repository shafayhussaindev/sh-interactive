import MaterialIcon from '../components/MaterialIcon';
import Nav from '../components/Nav';
import SmoothScrollProvider from '../components/SmoothScrollProvider';

export default function NotFound() {
  return (
    <SmoothScrollProvider>
      <Nav />
      <main className="grid min-h-svh place-items-center px-4 pt-24">
        <div className="text-center">
          <p className="eyebrow">404</p>
          <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.03em]">This page does not exist</h1>
          <p className="mt-4 text-soft">The link may be old or mistyped.</p>
          <a href="/" className="btn btn-primary mt-8">
            Back to home
            <MaterialIcon name="arrow_forward" size={18} />
          </a>
        </div>
      </main>
    </SmoothScrollProvider>
  );
}
