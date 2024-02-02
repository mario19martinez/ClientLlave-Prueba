
// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

function VideoPlayer({ videoUrl, title }) {
    return (
        <div className="border-dashed border-4 rounded shadow-lg p-4 border-blue-200 bg-blue-50">
            <h2 className="text-xl mb-4">{title}</h2>
            <div className="aspect-w-16 aspect-h-9">
                <video className="object-cover w-96 h-auto" controls>
                    <source src={videoUrl} type="video/mp4" />
                    Tu navegador no soporta el tag de video.
                </video>
            </div>
        </div>
    );
}

VideoPlayer.propTypes = {
    videoUrl: PropTypes.string.isRequired, 
    title: PropTypes.string.isRequired,     
};

export default VideoPlayer;
