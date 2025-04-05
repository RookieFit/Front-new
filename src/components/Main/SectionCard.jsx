import React from 'react';
import PropTypes from 'prop-types';

const SectionCard = ({ title, children }) => {
    return (
        <article className="flex-1 h-full bg-mainRed rounded-md p-4 bg-opacity-40">
            <header>
                <h2 className="text-lg text-mainText ml-2">{title}</h2>
            </header>
            <div className="mt-2">{children}</div>
        </article>
    );
};

SectionCard.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
};

export default SectionCard;