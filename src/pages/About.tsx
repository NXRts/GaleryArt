import React from 'react';

const About: React.FC = () => {
    return (
        <div className="page-container fade-in">
            <div className="content-wrapper">
                <h1>Our Story</h1>
                <p className="intro-text">
                    Born from a passion for the visual arts, GaleryArt is a digital sanctuary for creatives,
                    dreamers, and seekers of beauty.
                </p>

                <div className="section">
                    <h2>The Mission</h2>
                    <p>
                        We believe that art is not just about aesthetics—it's about connection.
                        Our platform bridges the gap between the world's most talented photographers
                        and those who find inspiration in their work. Powered by the Unsplash community,
                        we curate moments that take your breath away.
                    </p>
                </div>

                <div className="section">
                    <h2>The Aesthetics</h2>
                    <p>
                        Designed with a "less is more" philosophy, our interface stands back to let the art shine.
                        Dark modes, subtle animations, and clean typography ensure that your focus remains
                        undisturbed.
                    </p>
                </div>
            </div>

            <style>{`
                .page-container {
                    padding: var(--spacing-xl) var(--spacing-md);
                    max-width: 800px;
                    margin: 0 auto;
                    min-height: 80vh;
                }
                
                .content-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-lg);
                }
                
                h1 {
                    font-size: 4rem;
                    background: linear-gradient(135deg, #fff 0%, var(--color-accent) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: var(--spacing-md);
                }

                .intro-text {
                    font-size: 1.5rem;
                    line-height: 1.4;
                    color: var(--color-text-primary);
                    border-left: 4px solid var(--color-accent);
                    padding-left: var(--spacing-md);
                }

                .section h2 {
                    font-size: 2rem;
                    margin-bottom: var(--spacing-sm);
                    color: var(--color-text-primary);
                }

                .section p {
                    font-size: 1.1rem;
                    color: var(--color-text-secondary);
                    line-height: 1.8;
                }

                @media (max-width: 768px) {
                    h1 { font-size: 2.5rem; }
                    .intro-text { font-size: 1.2rem; }
                }
            `}</style>
        </div>
    );
};

export default About;
